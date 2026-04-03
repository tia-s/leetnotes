module Types
  class HighLevelDesignType < BaseObject
    graphql_name "HighLevelDesign"

    field :overview, String, null: false
    field :components, [ComponentType], null: false
  end
end