Rails.application.routes.draw do
  # devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root :to => "welcome#index"
  # get '/destination/get_coordinates/:name', to: 'destination#coordinates'
  resources :destination do
    collection do
      get 'get_coordinates/:name', to: 'destination#get_coordinates'
    end
  end

  devise_for :users, :controllers => {registrations: 'users/registrations', sessions: 'users/sessions'}

  get '/users/get_territories/:country', to: 'welcome#get_territories' 
  get '/users/get_cities/:country/:territory', to: 'welcome#get_cities' 
end
