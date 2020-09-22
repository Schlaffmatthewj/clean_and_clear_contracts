class AddColumnApiV1Companies < ActiveRecord::Migration[6.0]
  def change
    add_column :api_v1_companies, :password_digest, :text
  end
end
