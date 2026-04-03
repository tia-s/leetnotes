module Types
  class ComponentType < BaseObject
    graphql_name "Component"

    field :name, String, null: false
    field :description, String, null: false
  end
end