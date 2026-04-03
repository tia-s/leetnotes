module Types
  class SolutionType < BaseObject
    graphql_name "Solution"

    field :slug, String, null: false
    field :name, String, null: false
    field :approach, ApproachEnum, null: false
    field :tags, [String], null: false
    field :overview_html, String, null: true
    field :time_complexity, String, null: false
    field :space_complexity, String, null: false
    field :issues, [String], null: false
    field :pseudocode_html, String, null: true
    field :implementations, [ImplementationType], null: false
  end
end