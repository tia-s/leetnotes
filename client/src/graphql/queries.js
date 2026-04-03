import { gql } from '@apollo/client';

export const GET_PROBLEMS = gql`
  query GetProblems($difficulty: Difficulty, $search: String) {
    problems(difficulty: $difficulty, search: $search) {
      id
      slug
      name
      difficulty
      leetcodeUrl
    }
  }
`;

export const GET_PROBLEM = gql`
  query GetProblem($slug: String!) {
    problem(slug: $slug) {
      id
      slug
      name
      difficulty
      leetcodeUrl
      descriptionHtml
      analysisHtml
      useCases
      solutions {
        slug
        name
        approach
        tags
        overviewHtml
        timeComplexity
        spaceComplexity
        issues
        pseudocodeHtml
        implementations {
          language
          file
          dataStructures
          codeContent
        }
      }
    }
  }
`;

export const GET_PATTERNS = gql`
  query GetPatterns {
    patterns {
      slug
      name
      icon
      tagline
      timeComplexity
      problemSlugs
      problems {
        slug
        name
        difficulty
      }
    }
  }
`;

export const GET_PATTERN = gql`
  query GetPattern($slug: String!) {
    pattern(slug: $slug) {
      slug
      name
      icon
      tagline
      timeComplexity
      spaceComplexity
      overviewHtml
      whenToUse
      howItWorks {
        descriptionHtml
        steps
      }
      keyInsight
      pseudocodeHtml
      problemSlugs
      problems {
        slug
        name
        difficulty
      }
    }
  }
`;

export const GET_SYSTEM_DESIGN_LIST = gql`
  query GetSystemDesignList {
    systemDesignQuestions {
      slug
      name
      difficulty
      tags
    }
  }
`;

export const GET_SYSTEM_DESIGN = gql`
  query GetSystemDesign($slug: String!) {
    systemDesignQuestion(slug: $slug) {
      slug
      name
      difficulty
      tags
      referenceUrl
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
`;
