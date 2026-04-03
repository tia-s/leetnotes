module Types
  class SystemDesignSummaryType < BaseObject
    graphql_name "SystemDesignSummary"

    field :slug, String, null: false
    field :name, String, null: false
    field :difficulty, DifficultyEnum, null: false
    field :tags, [String], null: false
  end
end