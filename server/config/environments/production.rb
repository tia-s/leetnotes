require "active_support/core_ext/integer/time"

Rails.application.configure do
  config.enable_reloading = false
  config.eager_load = true
  config.consider_all_requests_local = false

  config.log_level = :info
  config.log_tags = [:request_id]
  config.logger = ActiveSupport::Logger.new($stdout)

  config.hosts.clear
end