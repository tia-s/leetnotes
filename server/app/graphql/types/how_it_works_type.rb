module Types
  class HowItWorksType < BaseObject
    graphql_name "HowItWorks"

    field :description_html, String, null: true
    field :steps, [String], null: false
  end
end