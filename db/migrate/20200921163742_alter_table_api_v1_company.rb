class AlterTableApiV1Company < ActiveRecord::Migration[6.0]
  def change
    change_column :api_v1_companies, :password_digest, :string
  end
end