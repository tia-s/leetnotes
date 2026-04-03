Rails.application.config.secret_key_base = ENV.fetch("SECRET_KEY_BASE") {
  if Rails.env.development? || Rails.env.test?
    "dev_secret_key_base_not_for_production_use_" + "0" * 90
  else
    raise "SECRET_KEY_BASE environment variable must be set in production"
  end
}