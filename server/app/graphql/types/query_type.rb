module Types
  class QueryType < BaseObject
    graphql_name "Query"

    # -- Meta --

    field :meta, MetaType, null: false

    def meta
      DATA_STORE.meta
    end

    # -- Problems --

    field :problems, [ProblemSummaryType], null: false do
      argument :difficulty, DifficultyEnum, required: false
      argument :search, String, required: false
    end

    def problems(difficulty: nil, search: nil)
      results = DATA_STORE.problems

      results = results.select { |p| p["difficulty"] == difficulty } if difficulty
      if search
        term = search.downcase
        results = results.select { |p| p["name"].downcase.include?(term) }
      end

      results
    end

    field :problem, ProblemType, null: false do
      argument :slug, String, required: true
    end

    def problem(slug:)
      DATA_STORE.problem(slug)
    end

    # -- Patterns --

    field :patterns, [PatternSummaryType], null: false

    def patterns
      DATA_STORE.patterns
    end

    field :pattern, PatternType, null: false do
      argument :slug, String, required: true
    end

    def pattern(slug:)
      DATA_STORE.pattern(slug)
    end

    # -- System Design --

    field :system_design_questions, [SystemDesignSummaryType], null: false

    def system_design_questions
      DATA_STORE.system_design_questions
    end

    field :system_design_question, SystemDesignType, null: false do
      argument :slug, String, required: true
    end

    def system_design_question(slug:)
      DATA_STORE.system_design_question(slug)
    end
  end
end