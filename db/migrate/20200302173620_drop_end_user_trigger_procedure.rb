require 'system/database/postgres'

class DropEndUserTriggerProcedure < ActiveRecord::Migration[5.0]
  def change
    return unless System::Database.postgres?
    System::Database::Postgres::TriggerProcedure.new('tp_end_user_plans_tenant_id', nil).drop
  end
end

