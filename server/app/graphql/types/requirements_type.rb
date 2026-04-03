module Types
  class RequirementsType < BaseObject
    graphql_name "Requirements"

    field :functional, [String], null: false
    field :non_functional, [String], null: false
  end
end