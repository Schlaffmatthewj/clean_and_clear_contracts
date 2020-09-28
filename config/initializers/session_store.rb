if Rails.env == "production"
    Rails.application.config.session_store :cookie_store, key: "_contracts_authentication", domain: "https://fast-coast-80968.herokuapp.com"
    p :cookie_store
else
    Rails.application.config.session_store :cookie_store, 
        key: "_contracts_authentication"
end
