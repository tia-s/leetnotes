require_relative "boot"

require "action_controller/railtie"
require "active_model/railtie"

Bundler.require(*Rails.groups)

module Leetnotes
  class Application < Rails::Application
    config.load_defaults 7.1
    config.api_only = true

    config.leetnotes_data_path = Rails.root.join("data")
  end
end