module Types
  class ProblemType < BaseObject
    graphql_name "Problem"

    field :id, Integer, null: false
    field :slug, String, null: false
    field :name, String, null: false
    field :difficulty, DifficultyEnum, null: false
    field :leetcode_url, String, null: false
    field :description_html, String, null: true
    field :analysis_html, String, null: true
    field :use_cases, [String], null: false
    field :solutions, [SolutionType], null: false
  end
end