Rails.application.routes.draw do
  root 'static_pages#index'
  get 'static_pages/index'
  get 'static_pages/goodbye'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get '/js/script.js' => 'application#plausible_script_js'
  post '/api/event' => 'application#plausible_api_event'

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
end
