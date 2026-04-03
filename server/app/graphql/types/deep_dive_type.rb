module Types
  class DeepDiveType < BaseObject
    graphql_name "DeepDive"

    field :title, String, null: false
    field :content, String, null: false
  end
end