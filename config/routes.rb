Rails.application.routes.draw do
  # devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root :to => "welcome#index"
  # get '/destinations/get_coordinates/:name', to: 'destinations#coordinates'
  devise_for :users, :controllers => {registrations: 'users/registrations', sessions: 'users/sessions'}
  resource :users do
    resource :meal_preferences, shallow: true 
    resources :trips do
      resources :destinations do
      resources :restaurants, :lodgings, :attractions
      end
    end 
  end
    get '/users/get_coordinates/:name', to: 'destinations#get_coordinates' 
  get '/users/get_territories/:country', to: 'welcome#get_territories' 
  get '/users/get_cities/:country/:territory', to: 'welcome#get_cities'
  get "/pages/:page" => "pages#show"
end

