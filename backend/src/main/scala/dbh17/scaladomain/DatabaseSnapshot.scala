package dbh17.scaladomain

final case class DatabaseSnapshot(
    val personsByBlockchainAddress: Map[String, Person]) {

}
