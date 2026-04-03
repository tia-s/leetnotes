module Types
  class PatternType < BaseObject
    graphql_name "Pattern"

    field :slug, String, null: false
    field :name, String, null: false
    field :icon, String, null: false
    field :tagline, String, null: false
    field :time_complexity, String, null: false
    field :space_complexity, String, null: false
    field :overview_html, String, null: true
    field :when_to_use, [String], null: false
    field :how_it_works, HowItWorksType, null: false
    field :key_insight, String, null: true
    field :pseudocode_html, String, null: true
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