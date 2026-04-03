module Types
  class DifficultyEnum < BaseEnum
    graphql_name "Difficulty"

    value "EASY", value: "easy"
    value "MEDIUM", value: "medium"
    value "HARD", value: "hard"
  end
end