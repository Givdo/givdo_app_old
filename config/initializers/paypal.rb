CONFIG = YAML.load_file(Rails.root.join("config/paypal.yml"))[Rails.env]

module Paypal
  CLIENT_ID = CONFIG["client_id"]
  SECRET = CONFIG["secret"]
  PAYPAL_HOST = CONFIG["paypal_host"]
  APP_HOST = CONFIG["app_host"] 
  BUSINESS = CONFIG["business"]
end
  