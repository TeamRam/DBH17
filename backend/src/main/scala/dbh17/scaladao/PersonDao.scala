package dbh17.scaladao

import java.time.LocalDate

import dbh17.scaladomain.Address

trait PersonDao {

  def addPerson(
    blockchainAddress: String,
    name: String,
    birthDate: LocalDate,
    mainAddress: Address): Unit
}
