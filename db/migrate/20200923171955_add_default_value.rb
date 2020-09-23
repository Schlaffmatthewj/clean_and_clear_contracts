class AddDefaultValue < ActiveRecord::Migration[6.0]
  def change
    change_column :api_v1_companies, :is_owner, :boolean, :default => false
  end
end
