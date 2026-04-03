module Types
  class SystemDesignType < BaseObject
    graphql_name "SystemDesign"

    field :slug, String, null: false
    field :name, String, null: false
    field :difficulty, DifficultyEnum, null: false
    field :tags, [String], null: false
    field :reference_url, String, null: true
    field :requirements, RequirementsType, null: false
    field :high_level_design, HighLevelDesignType, null: false
    field :deep_dives, [DeepDiveType], null: false
    field :trade_offs, [TradeOffType], null: false
    field :bottlenecks, [BottleneckType], null: false
  end
end