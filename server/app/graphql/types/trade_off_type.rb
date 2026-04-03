module Types
  class TradeOffType < BaseObject
    graphql_name "TradeOff"

    field :title, String, null: false
    field :pros, [String], null: false
    field :cons, [String], null: false
  end
end