import { TransactionalRepository } from "./Transactional.repository";
import { UserRepository } from "./User.repository";

interface DatabaseRepository extends
    UserRepository,
    TransactionalRepository { }

export default DatabaseRepository