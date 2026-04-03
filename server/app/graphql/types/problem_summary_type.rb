module Types
  class ProblemSummaryType < BaseObject
    graphql_name "ProblemSummary"

    field :id, Integer, null: false
    field :slug, String, null: false
    field :name, String, null: false
    field :difficulty, DifficultyEnum, null: false
    field :leetcode_url, String, null: false
  end
end