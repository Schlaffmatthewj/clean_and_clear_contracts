if Rails.env == "production"
    p :cookie_store
    Rails.application.config.session_store :cookie_store, 
        key: "_contracts_authentication", domain: "https://fast-coast-80968.herokuapp.com"
else
    Rails.application.config.session_store :cookie_store, 
        key: "_contracts_authentication"
end
