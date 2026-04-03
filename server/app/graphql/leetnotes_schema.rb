class LeetnotesSchema < GraphQL::Schema
  query Types::QueryType

  max_complexity 200
  max_depth 15

  rescue_from(DataStore::NotFoundError) do |err, _obj, _args, _ctx, _field|
    raise GraphQL::ExecutionError, err.message
  end
end