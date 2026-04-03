module Types
  class MetaType < BaseObject
    graphql_name "Meta"

    field :name, String, null: false
    field :tagline, String, null: false
    field :languages, [String], null: false
    field :difficulties, [String], null: false
    field :approaches, [String], null: false
  end
end