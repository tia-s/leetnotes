module Types
  class BottleneckType < BaseObject
    graphql_name "Bottleneck"

    field :title, String, null: false
    field :mitigation, String, null: false
  end
end