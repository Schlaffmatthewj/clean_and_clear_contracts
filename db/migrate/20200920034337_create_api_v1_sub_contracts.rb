class CreateApiV1SubContracts < ActiveRecord::Migration[6.0]
  def change
    create_table :api_v1_sub_contracts do |t|
      t.money :amount
      t.belongs_to :api_v1_task, null: false, foreign_key: true
      t.belongs_to :api_v1_company, null: false, foreign_key: true

      t.timestamps
    end
  end
end
