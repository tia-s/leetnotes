module Types
  class PatternSummaryType < BaseObject
    graphql_name "PatternSummary"

    field :slug, String, null: false
    field :name, String, null: false
    field :icon, String, null: false
    field :tagline, String, null: false
    field :time_complexity, String, null: false
    field :problem_slugs, [String], null: false

    def problem_slugs
      object["problems"]
    end

    field :problems, [ProblemSummaryType], null: false

    def problems
      all_problems = DATA_STORE.problems
      slugs = object["problems"]
      all_problems.select { |p| slugs.include?(p["slug"]) }
    end
  end
end