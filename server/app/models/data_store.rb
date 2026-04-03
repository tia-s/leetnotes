class DataStore
  class NotFoundError < StandardError; end

  def initialize(base_path = nil)
    @base_path = Pathname.new(base_path || Rails.configuration.leetnotes_data_path)
    @cache = {}
  end

  # -- Meta --

  def meta
    read_json("meta.json")
  end

  # -- Problems --

  def problems
    read_json("problems/index.json").fetch("problems")
  end

  def problem(slug)
    dir = problem_dir(slug)
    raise NotFoundError, "Problem not found: #{slug}" unless dir

    data = read_json(dir.join("problem.json").relative_path_from(@base_path).to_s)
    data["description_html"] = read_markdown(dir.join("description.md"))
    data["analysis_html"] = read_markdown(dir.join("analysis.md"))
    data["solutions"].each do |sol|
      sol["overview_html"] = read_markdown(dir.join(sol["overview"])) if sol["overview"]
      sol["pseudocode_html"] = read_markdown(dir.join(sol["pseudocode"])) if sol["pseudocode"]
      sol["implementations"].each do |impl|
        impl["code_content"] = read_file(dir.join(impl["file"])) if impl["file"]
      end
    end
    data
  end

  # -- Patterns --

  def patterns
    read_json("patterns/index.json").fetch("patterns")
  end

  def pattern(slug)
    path = "patterns/#{slug}/pattern.json"
    dir = @base_path.join("patterns/#{slug}")
    raise NotFoundError, "Pattern not found: #{slug}" unless File.exist?(@base_path.join(path))

    data = read_json(path)
    data["overview_html"] = read_markdown(dir.join(data["overview"])) if data["overview"]
    data["pseudocode_html"] = read_markdown(dir.join(data["pseudocode"])) if data["pseudocode"]
    if data["how_it_works"] && data["how_it_works"]["description"]
      data["how_it_works"]["description_html"] = read_markdown(dir.join(data["how_it_works"]["description"]))
    end
    data
  end

  # -- System Design --

  def system_design_questions
    read_json("system-design/index.json").fetch("questions")
  end

  def system_design_question(slug)
    path = "system-design/#{slug}/problem.json"
    raise NotFoundError, "System design question not found: #{slug}" unless File.exist?(@base_path.join(path))

    read_json(path)
  end

  private

  def problem_dir(slug)
    Dir.glob(@base_path.join("problems/*/")).each do |dir|
      dir_path = Pathname.new(dir)
      folder_name = dir_path.basename.to_s
      return dir_path if folder_name.end_with?("-#{slug}")
    end
    nil
  end

  def read_json(relative_path)
    full_path = @base_path.join(relative_path)
    cache_key = full_path.to_s

    if Rails.env.development?
      JSON.parse(File.read(full_path))
    else
      @cache[cache_key] ||= JSON.parse(File.read(full_path))
    end
  end

  def read_markdown(full_path)
    return nil unless File.exist?(full_path)
    File.read(full_path)
  end

  def read_file(full_path)
    return nil unless File.exist?(full_path)
    File.read(full_path)
  end
end