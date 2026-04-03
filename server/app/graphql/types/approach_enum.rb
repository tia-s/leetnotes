module Types
  class ApproachEnum < BaseEnum
    graphql_name "Approach"

    value "NAIVE", value: "naive"
    value "SUBOPTIMAL", value: "suboptimal"
    value "OPTIMAL", value: "optimal"
  end
end