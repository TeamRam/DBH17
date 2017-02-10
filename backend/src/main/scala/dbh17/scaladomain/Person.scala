package dbh17.scaladomain

import java.time.LocalDate

final case class Person(
  val blockchainAddress: String,
  val name: String,
  val birthDate: LocalDate,
  val mainAddress: Address)
