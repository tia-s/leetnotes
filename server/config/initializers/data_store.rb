Rails.application.config.after_initialize do
  DATA_STORE = DataStore.new
end