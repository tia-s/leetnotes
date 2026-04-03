# LeetNotes

From naive to optimal — documenting the thinking, not just the answer.

A personal study tool for tracking LeetCode problems, algorithmic patterns, and system design questions. Built with a Rails API (GraphQL) backend and a React frontend.

---

## Project Structure

```
leetnotes/
├── README.md
├── server/                                  # Rails API (GraphQL)
│   ├── Gemfile                              # Ruby dependencies
│   ├── Rakefile                             # Task runner entry point
│   ├── config.ru                            # Rack entry point
│   ├── bin/
│   │   └── rails                            # Rails CLI executable
│   ├── config/
│   │   ├── boot.rb                          # Bundler setup
│   │   ├── application.rb                   # Rails app config (API mode, data path)
│   │   ├── environment.rb                   # Initializes the app
│   │   ├── puma.rb                          # Web server config
│   │   ├── routes.rb                        # Single POST /graphql endpoint
│   │   ├── environments/
│   │   │   ├── development.rb
│   │   │   └── production.rb
│   │   └── initializers/
│   │       ├── cors.rb                      # Allows requests from the React client
│   │       ├── data_store.rb                # Instantiates the global DATA_STORE
│   │       └── secret_key_base.rb           # Rails secret key
│   ├── app/
│   │   ├── controllers/
│   │   │   ├── application_controller.rb    # Base API controller
│   │   │   └── graphql_controller.rb        # Handles POST /graphql
│   │   ├── models/
│   │   │   └── data_store.rb               # Reads JSON/Markdown from data/
│   │   └── graphql/
│   │       ├── leetnotes_schema.rb          # Schema root, error handling
│   │       └── types/
│   │           ├── base_object.rb
│   │           ├── base_enum.rb
│   │           ├── query_type.rb            # All query entry points + filtering
│   │           ├── difficulty_enum.rb
│   │           ├── approach_enum.rb
│   │           ├── meta_type.rb
│   │           ├── problem_summary_type.rb
│   │           ├── problem_type.rb
│   │           ├── solution_type.rb
│   │           ├── implementation_type.rb
│   │           ├── pattern_summary_type.rb
│   │           ├── pattern_type.rb
│   │           ├── how_it_works_type.rb
│   │           ├── system_design_summary_type.rb
│   │           ├── system_design_type.rb
│   │           ├── requirements_type.rb
│   │           ├── high_level_design_type.rb
│   │           ├── component_type.rb
│   │           ├── deep_dive_type.rb
│   │           ├── trade_off_type.rb
│   │           └── bottleneck_type.rb
│   └── data/                                # JSON + Markdown content
│       ├── meta.json
│       ├── problems/
│       │   ├── index.json
│       │   └── {id}-{slug}/
│       │       ├── problem.json
│       │       ├── description.md           # problem description
│       │       ├── analysis.md              # my breakdown of the problem
│       │       └── solutions/
│       │           └── {n}-{slug}/
│       │               ├── overview.md
│       │               ├── pseudo.md
│       │               ├── code.py
│       │               └── code.java
│       ├── patterns/
│       │   ├── index.json
│       │   └── {slug}/
│       │       ├── pattern.json
│       │       ├── overview.md
│       │       ├── how_it_works.md
│       │       └── pseudo.md
│       └── system-design/
│           ├── index.json
│           └── {slug}/
│               └── problem.json
│
├── client/                                  # React frontend (Vite + Apollo)
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── graphql/
│       │   ├── client.js
│       │   └── queries.js
│       ├── styles/
│       │   └── global.css
│       ├── components/
│       │   ├── Nav.jsx
│       │   ├── Nav.module.css
│       │   ├── DifficultyBadge.jsx
│       │   ├── DifficultyBadge.module.css
│       │   ├── Tag.jsx
│       │   ├── Tag.module.css
│       │   ├── Section.jsx
│       │   ├── Section.module.css
│       │   ├── CodeBlock.jsx
│       │   ├── CodeBlock.module.css
│       │   └── Loading.jsx
│       └── pages/
│           ├── ProblemsPage.jsx
│           ├── ProblemsPage.module.css
│           ├── ProblemDetailPage.jsx
│           ├── ProblemDetailPage.module.css
│           ├── PatternsPage.jsx
│           ├── PatternsPage.module.css
│           ├── PatternDetailPage.jsx
│           ├── PatternDetailPage.module.css
│           ├── SystemDesignPage.jsx
│           ├── SystemDesignPage.module.css
│           ├── SystemDesignDetailPage.jsx
│           └── SystemDesignDetailPage.module.css
│
└── README.md
```

---

## Server

Rails 7.1 in API mode. No database — all content is read from JSON and Markdown files in `server/data/`. A single GraphQL endpoint serves everything.

### Setup

```bash
cd server
bundle install
```

### Run

```bash
rails server
```

- **GraphQL endpoint:** `POST http://localhost:3000/graphql`
- **GraphiQL explorer:** `http://localhost:3000/graphiql` (development only)

### Configuration

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Server port |
| `CORS_ORIGINS` | `http://localhost:5173` | Allowed frontend origin |
| `RAILS_ENV` | `development` | Environment (`development` / `production`) |

In development, the `DataStore` reads JSON files on every request (no caching). In production, files are cached in memory after first read.

### GraphQL Schema

**Queries:**

| Query | Arguments | Returns | Description |
|---|---|---|---|
| `meta` | — | `Meta` | Site config and valid enum values |
| `progress` | — | `Progress` | Problem completion counts |
| `problems` | `difficulty`, `pattern`, `search` | `[ProblemSummary]` | Filtered problem list |
| `problem` | `slug` | `Problem` | Full problem with solutions and code |
| `patterns` | — | `[Pattern]` | All patterns with resolved problems |
| `systemDesignQuestions` | — | `[SystemDesignSummary]` | System design list |
| `systemDesignQuestion` | `slug` | `SystemDesign` | Full system design breakdown |

**Enums:**

| Enum | Values |
|---|---|
| `Difficulty` | `EASY`, `MEDIUM`, `HARD` |
| `Approach` | `NAIVE`, `SUBOPTIMAL`, `OPTIMAL` |

### Example Query

```graphql
{
  progress {
    total
    solved
    attempted
    todo
  }

  problems(difficulty: EASY) {
    name
    slug
    tags
    patterns
  }

  problem(slug: "best-time-to-buy-and-sell-stock") {
    name
    useCases
    descriptionHtml
    solutions {
      name
      approach
      timeComplexity
      spaceComplexity
      issues
      pseudocodeHtml
      implementations {
        language
        codeContent
      }
    }
  }

  patterns {
    name
    icon
    description
    problems {
      name
      difficulty
    }
  }

  systemDesignQuestion(slug: "url-shortener") {
    name
    requirements {
      functional
      nonFunctional
    }
    highLevelDesign {
      overview
      components {
        name
        description
      }
    }
    deepDives {
      title
      content
    }
    tradeOffs {
      title
      pros
      cons
    }
    bottlenecks {
      title
      mitigation
    }
  }
}
```

### Adding Content

**New problem:**
1. Create `data/problems/{id}-{slug}/` with `problem.json`, `description.md`, and solution subdirectories.
2. Add an entry to `data/problems/index.json`.
3. Add the slug to any relevant patterns in `data/patterns/index.json`.

**New system design question:**
1. Create `data/system-design/{slug}/problem.json`.
2. Add an entry to `data/system-design/index.json`.

**New pattern:**
1. Add an entry to `data/patterns/index.json` with the pattern definition and associated problem slugs.

---

## Client

TODO

---