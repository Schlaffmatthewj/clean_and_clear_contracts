class AddColumnApiV1CompaniesIsOwner < ActiveRecord::Migration[6.0]
  def change
    add_column :api_v1_companies, :is_owner, :boolean
    add_reference :api_v1_projects, :api_v1_company, index: true
    add_foreign_key :api_v1_projects, :api_v1_companies
  end
end
