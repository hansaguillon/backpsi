export declare enum AuditAction {
    CREATE = "CREATE",
    EDIT = "EDIT",
    LOCK = "LOCK",
    ADDENDUM = "ADDENDUM",
    ACCESS = "ACCESS",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"
}
export declare enum EntityType {
    PATIENT = "PATIENT",
    SESSION = "SESSION",
    ADDENDUM = "ADDENDUM",
    SYSTEM = "SYSTEM"
}
export declare class CreateAuditDto {
    action: AuditAction;
    entityType: EntityType;
    entityId: string;
    details: string;
    userId: string;
    ipAddress?: string;
}
