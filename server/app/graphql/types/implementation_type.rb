module Types
  class ImplementationType < BaseObject
    graphql_name "Implementation"

    field :language, String, null: false
    field :file, String, null: false
    field :data_structures, [String], null: false
    field :code_content, String, null: true
  end
end