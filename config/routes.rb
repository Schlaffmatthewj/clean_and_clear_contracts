Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :sessions, only: [:create]
      delete :logout, to: "sessions#logout"
      get :logged_in, to: "sessions#logged_in"
      resources :companies, only: [:index, :show, :create, :update, :destroy] do
          resources :projects, only: [:index, :show], controller: 'prime_contracts' do
            resources :prime_contracts, only: [:create, :destroy]
          end
          resources :tasks, only: [:index, :show], controller: 'sub_contracts' do
            resources :sub_contracts, only: [:create, :destroy]
          end
      end
      resources :projects, only: [:index, :show, :create, :update, :destroy] do
        resources :phases, only: [:index, :show, :create, :update, :destroy] do
          resources :tasks, only: [:index, :show, :create, :update, :destroy]
        end
      end
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end