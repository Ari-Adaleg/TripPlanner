class MealPreferencesController < ApplicationController
        
    def new
        if current_user.meal_preference
            @meal_preference = current_user.meal_preference
        else
            @meal_preference = MealPreference.new
        end               
    end

    def create
        @mealPreference = MealPreference.new(meal_preference_params)
        @mealPreference.user = current_user
        if @mealPreference.save
            root_url
        else
            render :new
        end
    end

    def update 
        @mealPreference = current_user.meal_preference
        if @mealPreference.update(meal_preference_params)
            redirect_to root_url
        else
            render :edit
        end
    end

private
    def meal_preference_params 
        params.require(:meal_preference).permit(:gluten_free, :vegetarian, 
          :vegan, :dairy_free, :low_sodium, :kosher, :halal)
    end
end

