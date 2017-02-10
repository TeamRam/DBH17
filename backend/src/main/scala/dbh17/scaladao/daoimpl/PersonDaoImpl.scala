package dbh17.scaladao.daoimpl

import java.time.LocalDate
import java.util.concurrent.atomic.AtomicReference

import dbh17.scaladao.PersonDao
import dbh17.scaladomain.Address
import dbh17.scaladomain.DatabaseSnapshot
import dbh17.scaladomain.Person

final class PersonDaoImpl(
    val snapshotRef: AtomicReference[DatabaseSnapshot]) extends PersonDao {

  def addPerson(
    blockchainAddress: String,
    name: String,
    birthDate: LocalDate,
    mainAddress: Address): Unit = {

    val person = Person(blockchainAddress, name, birthDate, mainAddress)

    val updatedSnapshot: DatabaseSnapshot =
      snapshotRef.get.copy(
        personsByBlockchainAddress =
          snapshotRef.get.personsByBlockchainAddress + (blockchainAddress -> person))

    snapshotRef.set(updatedSnapshot)
  }
}
