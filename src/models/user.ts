import { DataTypes, Model } from 'https://deno.land/x/denodb/mod.ts'

class User extends Model {
  static table = 'user'
  static timestamps = true

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    created_at: { type: DataTypes.TIMESTAMP },
  }
}

export default User