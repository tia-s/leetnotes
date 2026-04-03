# LeetNotes — Backend Design

## Overview

This is a JSON backend without a database. The frontend fetches JSON index files for list pages and individual detail files on navigation. Long-form content (problem descriptions, pseudocode) is stored as Markdown.

---

## Directory Structure

```
leetnotes-data/
├── problems/
│   ├── index.json
│   ├── 1-two-sum/
│   │   ├── problem.json
│   │   ├── description.md
│   │   └── solutions/
│   │       ├── 0-brute-force/
│   │       │   ├── pseudo.md
│   │       │   ├── code.py
│   │       │   └── code.java
│   │       └── 1-hash-map/
│   │           ├── pseudo.md
│   │           ├── code.py
│   │           └── code.java
│   ├── 20-valid-parentheses/
│   │   └── ...
│   └── 121-best-time-to-buy-and-sell-stock/
│       └── ...
│
├── patterns/
│   └── index.json
│
├── system-design/
│   ├── index.json
│   └── url-shortener/
│       └── problem.json
│
└── meta.json
```

Folders use `{id}-{slug}/` naming for sort order and readability. Each solution approach is in its own subdirectory.

---

## Data Flow

```
Page                    Fetches
─────────────────────   ──────────────────────────────────
Problem Tracker         problems/index.json
Problem Detail          problems/{id}-{slug}/problem.json
                        + description.md, pseudo.md, code.*
Patterns & Categories   patterns/index.json
                        + problems/index.json (for difficulty/status)
System Design List      system-design/index.json
System Design Detail    system-design/{slug}/question.json
```

---

## Schema Reference

### `problems/index.json`

Lightweight list for the Problem Tracker page.

```jsonc
{
  "problems": [
    {
      "id": 1,
      "slug": "two-sum",                          // canonical identifier, used in URLs and folder names
      "name": "Two Sum",
      "difficulty": "easy",                        // "easy" | "medium" | "hard"
      "tags": ["array", "hash-table"],             // data structures / topics
      "patterns": ["hash-map", "two-pointers"],    // algorithmic techniques (refs pattern slugs)
      "leetcode_url": "https://leetcode.com/problems/two-sum/"
    }
  ]
}
```

### `problems/{id}-{slug}/problem.json`

Full problem details.

```jsonc
{
  "id": 121,
  "slug": "best-time-to-buy-and-sell-stock",
  "name": "Best Time to Buy and Sell Stock",
  "difficulty": "easy",
  "tags": ["array", "dynamic-programming"],
  "patterns": ["sliding-window", "dynamic-programming"],
  "leetcode_url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
  "description": "description.md",

  "use_cases": [
    "Stock trading algorithms and portfolio optimization",
    "Finding optimal timing for resource allocation",
    "Price arbitrage detection in e-commerce"
  ],

  "solutions": [
    {
      "slug": "0-check-all-pairs",
      "name": "Check All Pairs",
      "approach": "naive",                   // "naive" | "optimized" | "optimal"
      "overview": "Try every possible buy-sell pair and track the maximum profit.",
      "pseudocode": "solutions/0-check-all-pairs/pseudo.md",
      "time_complexity": "O(n²)",
      "space_complexity": "O(1)",
      "issues": [                                  // warning callouts; empty for optimal solutions
        "Brute force checks every pair — very slow for large inputs",
        "Redundant work: we keep re-scanning future prices"
      ],
      "implementations": [
        {
          "language": "python",
          "file": "solutions/0-check-all-pairs/code.py",
          "data_structures": []
        },
        {
          "language": "java",
          "file": "solutions/0-check-all-pairs/code.java",
          "data_structures": []
        }
      ]
    }
  ]
}
```

### `patterns/index.json`

Pattern definitions with problem references by slug.

```jsonc
{
  "patterns": [
    {
      "slug": "hash-map",
      "name": "Hash Map",
      "icon": "🗃️",
      "description": "Use hash maps for O(1) lookups to avoid nested iterations",
      "problems": ["two-sum", "contains-duplicate"]
    }
  ]
}
```

### `system-design/index.json`

```jsonc
{
  "questions": [
    {
      "slug": "url-shortener",
      "name": "Design a URL Shortener",
      "difficulty": "medium",
      "tags": ["hashing", "database", "caching"]
    }
  ]
}
```

### `system-design/{slug}/question.json`

Full system design breakdown.

```jsonc
{
  "slug": "url-shortener",
  "name": "Design a URL Shortener",
  "difficulty": "medium",
  "tags": ["hashing", "database", "caching"],
  "reference_url": "",

  "requirements": {
    "functional": ["..."],
    "non_functional": ["..."]
  },

  "high_level_design": {
    "overview": "...",
    "components": [
      { "name": "API Gateway", "description": "..." }
    ]
  },

  "deep_dives": [
    { "title": "Key Generation", "content": "..." }
  ],

  "trade_offs": [
    {
      "title": "301 vs 302 redirect",
      "pros": ["..."],
      "cons": ["..."]
    }
  ],

  "bottlenecks": [
    { "title": "...", "mitigation": "..." }
  ]
}
```

---

## Conventions

- `slug` is the canonical identifier across all entities. It's used in URLs, folder names, and cross-references.
- `tags` = data structures and topics (LeetCode taxonomy). `patterns` = algorithmic techniques (Patterns page taxonomy).
- `approach` on solutions: `"naive"` → `"optimized"` → `"optimal"`. Maps to UI section headers and styling.
- `issues` on solutions: warning callouts on naive/optimized approaches. Empty array for optimal.
- `trade_offs` on system design: `{title, pros[], cons[]}` for the two-column pros/cons layout.
- `bottlenecks` on system design: `{title, mitigation}` pairs for warning callouts.
- All file paths in JSON are relative to the containing folder.
- Pattern→problem mappings are defined in `patterns/index.json`. The `patterns` field on individual problems is a denormalized copy for rendering tags on detail pages.