import {Moment} from "moment";

export interface UserType {
    person_id: number,
    last_name: string,
    first_name: string,
    middle_name: string,
    date_of_birth: Date,
    login: string
}

export interface GetProductsResponse {
    data: Product[];
}

export interface VideoProgress {
    "prog_time_video": string
    "prog_time_complete": boolean
    "fk_contract_id": number
    "fk_lib_item_id": number
    "fk_tr_stage_id": number
}

export interface PostVideoProgress {
    id: number
    post: {
        "prog_time_video": string
        "prog_time_complete": boolean
        "fk_contract_id": number
        "fk_lib_item_id": number
        "fk_tr_stage_id": number
    }
}

export interface PostActiveCP {
    contract_id: number
    status: number
}

export interface ContractControlPoint {
    "dr_school_id": number,
    "attempt_status": number,
    "test_met_name": string,
    "attempt_num": number
    "contract_id": number
    "control_point_id": number
    "attempt_validity": string,
    "state_reason": number,
    "control_point_code": string
    "attempt_end_validity": string,
    "notes": string,
    "control_point_name": string
    "resp_emp_id": number,
    "control_points_status": number
    "attempt_start_date": string
    "resp_emp_name": string
    "attempt_open_till": string
    "master_id": number,
    "retries__retry_limit": string
    "master_name": string
    "test_met_id": number
}

export interface GetActiveCP {
    data: ContractControlPoint[]
}

export interface PostActiveControlPoint {
    id: number
    post: ContractControlPoint
}

export interface ChatBarData {
    chatId: string
    otherUserId: string
    lastMessageText: string
    lastMessageCreatedAt: Moment
    chatName: string
    unreadCount: number
    admin: number
    notifications: boolean
}

export interface Participants {
    id: string
    name: string
}

export interface Product {
    "price_one_hour": number,
    "price": number,
    "profit_item": string,
    "type": number,
    "description": string,
    "fk_type_study_hour_id": number,
    "fk_tr_program_id": number,
    "amount_hours": number,
    "product_id": number,
    "product_name": string,
    "is_main": boolean,
    "deny_discount": boolean,
    "allow_online_payments": boolean,
    "status": "1" | "0",
    "fk_dr_school_id": number
}

export interface ProductPostType {
    id: number,
    post: {
        price: number,
        product_name: string,
    }
}

export interface GetBranchesResponse {
    data: Branch[];
}


export interface Branch {
    color: string,
    address_building_number: number;
    address_house_number: number;
    address_index: number;
    address_locality: string;
    address_office: string;
    address_region: string;
    address_street: string;
    branch_id: number;
    branch_name: string;
    director: string;
    email_address: string;
    notes: string;
    phone1: string;
    phone2: string;
}

export interface BranchPostType {
    id: number,
    post: {
        color: string,
        address_building_number: number;
        address_house_number: number;
        address_index: number;
        address_locality: string;
        address_office: string;
        address_region: string;
        address_street: string;
        branch_name: string;
        director: string;
        email_address: string;
        phone1: string;
        phone2: string;
    }
}

export interface GetChannelsResponse {
    data: Channel[];
}

export interface Channel {
    channel_id: number,
    channel_name: string
}

export interface GetAvatarsResponse {
    data: Avatar[],
}

export interface GetAvatarsQueryData {
    entity: string
    entity_id: number
}

export interface PostAvatars {
    id: number,
    file: any
}

export interface GetAvatarResponse {
    data: ArrayBufferLike,
}

export interface Avatar {
    avatar_id: number,
    avatar_name: string,
    fk_lead_id: number
}

export interface GetLeadsResponse {
    data: LeadsType[],
}

export interface GetLeadResponse {
    data: LeadsType,
}

export interface LeadsType {
    lead_id: number,
    branch_id: number,
    create_date: string,
    sur_name: string,
    name: string,
    middle_name: string,
    phone1: string,
    phone2: string,
    product_id: number,
    product_name: string,
    resp_employee_id: number,
    resp_manager_name: string,
    registrator_name: string,
    branch_name: string,
    channel_id: number,
    channel_name: string,
    preferred_akpp: boolean,
    preferred_date: Date,
    soc_networks: string,
    gender: string,
    lead_status: string,
    email_address: string,
    notes: string,
    fk_resp_emp_id?: number,
}

export interface LeadsPostResponseBody extends LeadsPostBody {
    lead_id: number;
}

export interface LeadsPostBody {
    create_date: string,
    sur_name: string,
    name: string,
    middle_name: string,
    phone1: string,
    phone2: string,
    fk_product_id: any,
    product_name?: string,
    fk_resp_emp_id?: any,
    resp_manager?: string,
    branch_name?: string,
    fk_branch_id?: any,
    fk_registrator_id?: any,
    fk_channel_id?: any,
    channel_name?: string,
    preferred_akpp: boolean,
    preferred_date: string | undefined,
    soc_networks: string,
    gender: string,
    lead_status: string,
    email_address: string,
    notes: string,
    status: string,
    fk_dr_school_id: number,
}

export interface LeadsPostType {
    lead_id: number,
    post: {
        create_date: string,
        sur_name: string,
        name: string,
        middle_name: string,
        phone1: string,
        phone2: string,
        fk_product_id?: number,
        product_name?: string,
        fk_resp_emp_id?: number,
        resp_manager?: string,
        branch_name?: string,
        fk_branch_id?: number,
        fk_registrator_id?: number,
        fk_channel_id?: number,
        channel_name?: string,
        preferred_akpp: boolean,
        preferred_date: string,
        soc_networks: string,
        gender: string,
        lead_status: string,
        email_address: string,
        notes: string,
    }
}

export interface TableLeadsType extends LeadsType {
    full_name: string;
}

export interface PostType {
    id: number,
    post: {
        last_name: string,
        first_name: string,
        middle_name: string,
        // contract_number: string,
        // current_student_status: string,
        // employee_last_name: string,
        // training_group_number: string,
        // training_group_current_status: string,
        // date_start_training: string,
        // id: string,
        date_of_birth: string,
        login: string
    }
}

export interface TrainingProgramsPostType {
    id: number,
    post: {
        direction_training: string,
        duration_training: string,
        target_category: string,
        teaching_methods: string,
        tr_program_code: number,
        tr_program_name: string,
        view_education: string,
    }
}

export interface GetTrainingProgramsResponse {
    data: TrainingPrograms[],
}

export interface TrainingPrograms {
    direction_training: string,
    duration_training: string,
    notes: string,
    target_category: string,
    teaching_methods: string,
    tr_program_code: number,
    tr_program_id: 1,
    tr_program_name: string,
    view_education: string,
}

export interface GetJobTitleResponse {
    data: JobTitle[],
}

export interface JobTitle {
    notes: string,
    pos_id: number,
    pos_name: string,
}

export interface GetUsersResponse {
    data: UserType[],
}

export interface TableItemInfo {
    date_of_birth: Date,
    key: string,
    id: number,
    login: string,
    dateStartTraining: string,
    full_name: string,
    currentStudentStatus: string,
    instructorPlan: string,
    contractNumber: string,
    employeeLastName: string,
    groupNumber: string,
    vjd: string,
    dop: string,
    tsz: string,
    grn: string,
    ntr: string,
}

export interface GetEmployeeResponse {
    data: EmployeeItemInfo[],
}

export interface EmployeePostType {
    id: number,
    post: {
        citizenship: string;
        country: string;
        current_gender: string;
        data_education_document: string;
        date_end_work: string;
        date_of_birth: string;
        date_start_work: string;
        driving_experience: string;
        education: string;
        educational_institution: string;
        email_address: string;
        emp_id: number;
        emp_middle_name: string;
        emp_name: string;
        emp_sur_name: string;
        former_last_name: string;
        inn: number;
        notes: string;
        phone1: string;
        phone2: string;
        place_of_birth: string;
        qualification: string;
        reg_address_apartment_number: number;
        reg_address_building_number: number;
        reg_address_house_number: number;
        reg_address_locality: string;
        reg_address_region: string;
        reg_address_street: string;
        reg_address_zipcode: number;
        reg_date: string;
        reg_end_date: string;
        region_country_of_birth: string;
        res_address_apartment_number: number;
        res_address_building_number: number;
        res_address_house_number: number;
        res_address_locality: string;
        res_address_region: string;
        res_address_street: string;
        res_address_zipcode: string;
        service_number: number;
        snils: number;
        specialization: string;
        trusting: boolean;
        year_end_study: string;
    }
}

export interface EmployeeItemInfo {
    citizenship: string;
    avatar_path: string;
    country: string;
    current_gender: string;
    data_education_document: string;
    date_end_work: string;
    date_of_birth: string;
    date_start_work: string;
    driving_experience: string;
    education: string;
    educational_institution: string;
    email_address: string;
    emp_id: number;
    emp_middle_name: string;
    emp_name: string;
    emp_sur_name: string;
    former_last_name: string;
    inn: number;
    notes: string;
    phone1: string;
    phone2: string;
    place_of_birth: string;
    qualification: string;
    reg_address_apartment_number: number;
    reg_address_building_number: number;
    reg_address_house_number: number;
    reg_address_locality: string;
    reg_address_region: string;
    reg_address_street: string;
    reg_address_zipcode: number;
    reg_date: string;
    reg_end_date: string;
    region_country_of_birth: string;
    res_address_apartment_number: number;
    res_address_building_number: number;
    res_address_house_number: number;
    res_address_locality: string;
    res_address_region: string;
    res_address_street: string;
    res_address_zipcode: string;
    service_number: number;
    snils: number;
    specialization: string;
    trusting: boolean;
    year_end_study: string;
}

export interface TableEmployeeType extends EmployeeItemInfo {
    key?: number;
}

export interface Data {
    id: number,
    category: string[],
    name: string,
    state: string,
    startDate: string,
    address: string
}

export type FormValues = {
    pactNumber: string,
    startDate: string,
    endDate: string,
    dismissDate: string,
    promotedFrom: string,
    secondName: string,
    firstName: string,
    lastName: string,
    previousLastName: string,
    gender: string,
    birthDay: string,
    age: string,
    country: string,
    number: string,
    GIBDDNum: string,
    region: string,
    studStatus: string,
    phoneNumber: string,
    email: string,
    phoneAdvanced: string,
    secondPhoneComment: string,
    files: any
}

export interface ControlPointsResponse {
    data: ControlPoints[];
}

export interface ControlPoints {
    control_point_id: number,
    control_point_code: string,
    control_point_name: string,
    position_number: string,
    period_attempt: string,
    period_count: string,
    notification_end_period: string,
    notes: string,
}

export interface QrCodeResponse {
    payload: string,
    qrExpirationDate: string,
    qrId: string,
    qrStatus: string,
    qrUrl: string
}

export interface VideoStorageItem {
    watchedInSeconds: number,
    isWatched: boolean,
}

export interface LoginResponse {
    data: {
        data: Login[]
    },
}

export interface Login {
    user_id: number,
    id_reg: number,
    dr_school_id: number,
    email: string,
    access_token: string,
    username: string,
    role_id: number,
    password: string,
}

export interface GetPracticeScheduleSlotsSearchQuery {
    empty: EmptySlot[];
    full: FullSlot[];
}

export interface GetPracticeScheduleSlotsSearchQueryResponse {
    data: GetPracticeScheduleSlotsSearchQuery;
}

export interface GetPracticeScheduleSlotsQuery {
    start_date: string;
    end_date: string;
    master_id: number | undefined;
}

export interface EmptySlotPost {
    id: number,
    post: {
        "create_date": string,
        "start_date": string,
        "end_date": string,
        "amount": number,
        fk_plan_master_id: number,
        "amount_places": number,
        "notes": string,
        "note_for_master": string,
        "fk_slot_create_emp_id": number | undefined,
        "fk_type_study_hour_id": number,
        "fk_tr_vehicle_id": number,
        "fk_branch_id": number,
        "fk_dr_school_id": number,
        "fk_tr_place_id": number | undefined,
        status: "1" | "0"
    }

}

export interface EmptySlot {
    "amount": number;
    "start_date": string;
    "type_study_hour_name": string;
    "training_vehicle": string;
    "notes": string;
    "plan_master_name": string;
    "fk_slot_create_emp_id": number;
    "fk_tr_vehicle_id": number;
    "fk_dr_school_id": number;
    "fk_tr_place_id": number;
    "end_date": string;
    "dr_session_id": number;
    "create_date": string;
    "amount_places": number;
    "branch_id": number;
    "dr_school_id": number;
    "status": "1" | "0";
    "fk_type_study_hour_id": number;
    "fk_branch_id": number;
    "plan_master_id": number;
}

export interface FullSlot {
    branch_id: number;
    branch_name: string;
    contract_id: number;
    dr_class_create_date: string;
    dr_class_id: number;
    dr_school_id: number;
    dr_school_sname: string;
    dr_session_id: number;
    driven_hours: number;
    emp_id: number;
    emp_name: string;
    fact_end_date: string;
    fact_master_id: number;
    fact_master_name: string;
    fact_start_date: string;
    note_for_adm: string;
    note_for_student: string;
    plan_end_date: string;
    plan_master_id: number;
    plan_master_name: string;
    plan_start_date: string;
    product_id: number;
    product_name: string;
    reserved_hours: number;
    slot_busy_emp_id: number;
    slot_busy_emp_name: string;
    slot_create_emp_id: number;
    slot_create_emp_name: string;
    status: "1" | "0";
    student_feedback: string;
    student_id: number;
    student_name: string;
    tr_group_id: number;
    tr_group_number: string;
    tr_place_id: number;
    tr_place_name: string;
    tr_vehicle_id: number;
    training_vehicle: string;
    transmission: string;
    type_study_hour_code: string;
    type_study_hour_color: string;
    type_study_hour_id: number;
    type_study_hour_name: string;
}

export interface SelectedLogin extends Login {
    idx: number
}

export interface ControlPointsPostType {
    id: number,
    post: {
        control_point_code: string,
        control_point_name: string,
        position_number: string,
        period_attempt: string,
        period_count: string,
        notification_end_period: string,
    }
}

export interface TrainingVehiclesResponse {
    data: TrainingVehicles[];
}

export interface TrainingVehicles {
    category: string,
    color: string,
    date_sale_rent: string,
    garage_room: string,
    notes: string,
    reg_number: string,
    region_code: string,
    tr_vehicle_brand: string,
    tr_vehicle_id: number,
    tr_vehicle_model: string,
    transmission: string,
    type_fuel: string,
    year_release: string,
}

export interface TrainingVehiclesPostType {
    id: number,
    post: {
        tr_vehicle_brand: string,
        date_sale_rent: string,
        tr_vehicle_model: string,
        garage_room: string,
        category: string,
        transmission: string,
        reg_number: string,
        region_code: string,
        year_release: string,
        color: string,
        type_fuel: string,
    }
}

export interface HoursTypesResponse {
    data: HoursTypes[];
}

export interface HoursTypes {
    type_study_hour_code: string,
    type_study_hour_name: string,
    color: string,
    position: string,
    notes: string,
    type_study_hour_id: number,
}

export interface HoursTypesPostType {
    id: number,
    post: {
        type_study_hour_code: string,
        type_study_hour_name: string,
        color: string,
        position: string,
    }
}

export interface TrainingPlacesResponse {
    data: TrainingPlaces[];
}

export interface TrainingPlaces {
    address: string,
    notes: string,
    phone1: string,
    phone2: string,
    position_number: string,
    tr_place_id: number,
    tr_place_name: string,
}

export interface TrainingPlacesPostType {
    id: number,
    post: {
        address: string,
        phone1: string,
        phone2: string,
        position_number: string,
        tr_place_name: string,
    }
}

export interface PositionsResponse {
    data: Position[];
}

export interface Position {
    notes: string,
    pos_id: number,
    pos_name: string,
}

export interface PositionsPostType {
    id: number,
    post: {
        notes: string,
        pos_name: string,
    }
}

export interface StatusResponse {
    data: Status[];
}

export interface Status {
    color: "#00929F"
    notes: null
    position_number: "0"
    status_client_id: 1
    status_client_name: "Новый лид"
}

export interface School {
    address: string,
    director: string,
    dr_school_bname: string,
    dr_school_fname: string,
    dr_school_id: number,
    dr_school_sname: string,
    email_address: string,
    inn: string,
    kpp: string,
    license_dept: string,
    license_end_date: string,
    license_num: number,
    license_start_date: string,
    move_hours: string,
    ogrn: string,
    phone1: string,
    phone2: string,
    site: string,
}

export interface SchoolPostType {
    id: number,
    post: {
        address: string,
        director: string,
        dr_school_bname: string,
        dr_school_fname: string,
        dr_school_sname: string,
        email_address: string,
        inn: string,
        kpp: string,
        license_dept: string,
        license_end_date: string,
        license_num: number,
        license_start_date: string,
        move_hours: string,
        ogrn: string,
        phone1: string,
        phone2: string,
        site: string,
    }
}

export interface GetSchoolResponse {
    data: School[];
}

export interface Group {
    branch_color: string,
    autodrom_contract: string,
    branch_id: number,
    branch_name: string,
    code_inspection: string,
    direction_training: string,
    fk_dr_school_id: number,
    dr_school_sname: string,
    driving_schedule: string,
    driving_start_date: string,
    examination_department: string,
    first_student_number: number,
    gibdd_exam: string,
    gibdd_registration: string,
    gibdd_result: string,
    internal_exam: string,
    fk_resp_emp_id: number,
    fk_tr_program_id: number,
    notes: string,
    resp_emp_id: number,
    resp_emp_name: string,
    status: string,
    students_limit: string,
    theory_schedule: string,
    tr_group_id: number,
    tr_group_number: string,
    tr_group_status: string,
    tr_program_id: number
    tr_program_name: string,
    training_direction: string,
    training_end_date: string,
    training_form: string,
    training_start_date: string,
}

export interface GroupPostType {
    id: number,
    post: {
        autodrom_contract: string,
        fk_branch_id: number,
        code_inspection: string,
        fk_dr_school_id: number,
        driving_schedule: string,
        driving_start_date: string,
        examination_department: string,
        first_student_number: number,
        gibdd_exam: string,
        gibdd_registration: string,
        gibdd_result: string,
        internal_exam: string,
        notes: string,
        fk_resp_emp_id: number,
        status: string,
        students_limit: string,
        theory_schedule: string,
        tr_group_number: string,
        tr_group_status: string,
        fk_tr_program_id: number
        training_direction: string,
        training_end_date: string,
        training_form: string,
        training_start_date: string,
    }
}

export interface AuthPostType {
    user_login: string;
    user_password: string;
}

export interface GetGroupsResponse {
    data: Group[];
}

export interface GetGroupResponse {
    data: Group;
}

export interface LeadChat {
    create_date: string,
    dr_school_id: string,
    dr_school_sname: string,
    lead_id: string,
    lead_name: string,
    message_id: string,
    message_text: string,
    message_type: string,
    resp_manager_id: string,
    resp_manager_name: string,
    status: string,
}

export interface LeadChatPostType {
    id: number,
    post: {
        message_type: string,
        message_text: string,
        create_date: string,
        status: string,
        fk_lead_id: string,
        fk_emp_id: string,
        fk_dr_school_id: string,
    }
}

export interface GetLeadChatResponse {
    data: LeadChat[];
}

export interface TrainingStage {
    tr_stage_id: number
    "tr_stage_mode": number
    "status": "1" | "0"
    "fk_tr_method_id": number
    "fk_theme_list_id": number[]
    "tr_stage_name": string
    "fk_pack_id": number
    "tr_stage_training_mode": number
    "tr_stage_order": number
}

export interface GetTrainingStageItemResponse {
    data: TrainingStage[];
}

export interface TrainingStageItemMaterial {
    "tr_stage_id": number
    "lib_item_id": number
    "lib_item_name": string
    "lib_item_url": string
}

export interface GetTrainingStageItemMaterialResponse {
    data: TrainingStageItemMaterial[];
}

export interface TestingMethod {
    "testing_mode": number
    "test_met_name": string
    "test_met_id": number
    "start_ticket_count": number
    "activity_monitoring": number
    "welcome_text": string
    "dr_school_id": number
    "test_pack_name": string
    "create_date": string
    "time_limit_min": number
    "device_monitoring": number
    "status": string
    "test_pack_id": number
    "test_met_quest_count": number
}

export interface ExamAnswer {
    card_answ_id: number
    card_answ_is_correct: boolean
    card_answ_key: number
    card_answ_order: number
    card_answ_text: string
    fk_card_quest_id: number
    status: string
    id?: number
}

export interface ExamQuestionType {
    answers: ExamAnswer[]
    block_num: number
    card_quest_comment: string
    card_quest_id: number
    card_quest_image: string
    card_quest_num: number
    card_quest_order: number
    card_quest_text: string
    status: string
    test_pack_id: number
    test_pack_name: string
    test_them_id: number
    test_them_name: string
    ticket_num: number
}

export interface GetTestingMethod {
    data: TestingMethod;
}

export interface PostAttempt {
    id: number,
    post: {
        "attempt_start_date": string;
        "retries_limit": number;
        "lead_name": string;
        "resp_emp_id": number;
        "attempt_end_date": string;
        "tr_group_id": number;
        "resp_emp_name": string;
        "retries": string;
        "tr_group_number": string;
        "fk_master_id": number;
        "attempt_num": number;
        "fk_control_point_id": number;
        "master_name": string;
        "attempt_status": number;
        "attempt_validity": number;
        "control_point_code": string;
        "fk_dr_school_id": number;
        "fk_resp_emp_id": number;
        "attempt_id": number;
        "attempt_end_validity": string;
        "control_point_name": string;
        "attempt_date": string;
        "notes": string;
        "fk_contract_id": number;
        "lead_id": number;
        status: "0" | "1";
    }
}

export interface Attempt {
    "attempt_start_date": string;
    "retries_limit": number;
    "lead_name": string;
    "resp_emp_id": number;
    "attempt_end_date": string;
    "tr_group_id": number;
    "resp_emp_name": string;
    "retries": string;
    "tr_group_number": string;
    "master_id": number;
    "attempt_num": number;
    "control_point_id": number;
    "master_name": string;
    "attempt_status": number;
    "attempt_validity": number;
    "control_point_code": string;
    "dr_school_id": number;
    "attempt_id": number;
    "attempt_end_validity": string;
    "control_point_name": string;
    "attempt_date": string;
    "notes": string;
    "contract_id": number;
    "lead_id": number;
    status: "0" | "1";
}

export interface Contract {
    branch_color: string,
    avatar_little_path: string,
    a_lead_path: string,
    a_emp_path: string,
    a_tr_vechicle_path: string,
    avatar_path: string,
    fact_tr_vehicle: string,
    plan_tr_vehicle: string,
    plan_master_name: string,
    type_study_hour_code: string,
    type_study_hour_color: string,
    age: string,
    branch_id: number,
    plan_master_id: number,
    hours_balance: number,
    branch_name: string,
    citizenship: string,
    contract_id: number,
    contract_number: string,
    date_of_birth: string,
    dr_school_id: number,
    dr_school_sname: string,
    end_date: string,
    inn: string,
    lead_id: number,
    place_of_birth: string,
    reg_address_building_number: string,
    reg_address_region: string,
    reg_address_zipcode: string,
    reg_date: string,
    reg_end_date: string,
    region_of_birth: string,
    res_address_building_number: string,
    res_address_region: string,
    res_address_zipcode: string,
    res_end_date: string,
    resp_emp_id: number,
    resp_emp_name: string,
    snils: string,
    start_date: string,
    status: string,
    student_name_from_leads: string,
    tr_group_id: number,
    tr_method_id: number,
    tr_group_number: string,
    files: any
}

export interface ContractPostType {
    id: number,
    post: {
        age: string,
        citizenship: string,
        contract_number: string,
        date_of_birth: string,
        dr_school_id: number,
        end_date: string,
        inn: string,
        lead_id: number,
        place_of_birth: string,
        reg_address_building_number: string,
        reg_address_region: string,
        reg_address_zipcode: string,
        reg_date: string,
        reg_end_date: string,
        region_of_birth: string,
        res_address_building_number: string,
        res_address_region: string,
        res_address_zipcode: string,
        res_end_date: string,
        resp_emp_id: number,
        snils: string,
        start_date: string,
        status: string,
        student_name: string,
        tr_group_number: string,
        fk_lead_id: number,
        fk_tr_group_id: number,
        fk_branch_id: number,
        fk_dr_school_id: number
    }
}

export interface GetContractsResponse {
    data: Contract[];
}

export interface GetContractResponse {
    data: Contract;
}

export interface GetEmployeeByPosIdResponse {
    data: GetEmployeeByPosId[],
}

export interface GetEmployee {
    data: EmployeeItemInfo,
}

export interface GetCounterAgentsResponse {
    data: CounterAgent[];
}

export interface GetCounterAgentResponse {
    data: CounterAgent;
}

export interface PersonalCabinetPostType {
    "email": string,
    "password": string,
    "is_active": boolean,
    "is_superuser": boolean,
    "is_verified": boolean,
    "username": string,
    "fk_role_id": number
}

export interface CounterAgent {
    address: string,
    director: string,
    dr_school_id: number,
    dr_school_sname: string,
    dr_school_bname: string,
    dr_school_fname: string,
    email_address: string,
    inn: string,
    kpp: string,
    license_dept: string,
    license_end_date: string,
    license_num: number,
    license_start_date: string,
    move_hours: string,
    ogrn: string,
    phone1: string,
    phone2: string,
    site: string,
}

export interface CounterAgentPostType {
    id: number,
    post: {
        address: string,
        director: string,
        dr_school_bname: string,
        dr_school_fname: string,
        dr_school_sname: string,
        email_address: string,
        inn: string,
        kpp: string,
        license_dept: string,
        license_end_date: string | undefined,
        license_num: number,
        license_start_date: string | undefined,
        move_hours: string,
        ogrn: string,
        phone1: string,
        phone2: string,
        site: string,
        status: string
    }
}

export interface GetProductResponse {
    data: Product;
}

export interface Position {
    notes: string,
    pos_id: number,
    pos_name: string,
}

export interface GetEmployeeByPosId {
    "pos_id": number,
    "sub_dr_school_id": number,
    "resp_manager_name": string,
    "dr_school_id": number,
    "pos_name": string,
    "emp_id": number,
    "sub_school_name": string,
    "dr_school_sname": string,
    tr_vehicle_id: number,
    training_vehicle: string
}

export interface PaymentSchedule {
    date: string;
    sum: number;
    key: number;
}

export interface Vassal {
    address: string,
    director: string,
    dr_school_id: number,
    dr_school_sname: string,
    notes: string,
    phone1: string,
    phone2: string,
    role: string,
    status: string,
    sub_school_id: number,
    sub_school_name: string,
    subord_end_date: string,
    subord_start_date: string,
}

export interface VassalPostType {
    id: number,
    post: {
        address: string,
        director: string,
        fk_dr_school_id: number,
        notes: string,
        phone1: string,
        phone2: string,
        role: string,
        status: string,
        sub_school_name: string,
        subord_end_date: string,
        subord_start_date: string,
    }
}

export interface GetVassalResponse {
    data: Vassal[];
}

export interface Payment {
    pay_id: number,
    pay_date: string,
    sale_sum: string,
    debit: string,
    pay_method: string,
    confirmed: boolean,
    notes: string,
    status: string,
    lead_id: number,
    student_name_from_leads: string,
    contract_id: number,
    contract_number: string,
    product_id: number,
    product_name: string,
    resp_emp_id: number,
    resp_emp_name: string,
    branch_id: number,
    branch_color: string,
    branch_name: string,
    dr_school_id: number,
    dr_school_sname: string,
}

export interface PaymentPostType {
    id: number,
    post: {
        pay_date: string,
        debit: string,
        pay_method: string,
        notes: string,
        confirmed?: boolean,
        fk_emp_id?: number,
        fk_product_id?: number,
        fk_lead_id?: number,
        fk_contract_id?: number,
        fk_dr_school_id?: number,
        fk_branch_id?: number,
    }
}

export interface GetPaymentResponse {
    data: Payment[];
}

export interface EmployeesSearch {
    emp_id: number;
    phone1: string;
    phone2: string;
    pos_name: string;
    resp_manager_name: string;
}

export interface ContractsSearch {
    contract_id: number;
    tr_group_number: string;
    contract_number: string;
    phone1: string;
    phone2: string;
    status: "1" | "0";
    student_name: string;
    tr_group_id: number;
}

export interface LeadsSearch {
    branch_name: string;
    create_date: string;
    lead_id: number;
    middle_name: string;
    name: string;
    phone1: string;
    lead_status: string;
    phone2: string;
    status: "1" | "0";
    sur_name: string;
}

export interface GroupsSearch {
    branch_name: string;
    driving_start_date: string;
    status: "1" | "0";
    tr_group_id: number;
    tr_group_number: string;
    training_start_date: string;
}

export interface GetSearchResponse {
    data: {
        contracts: ContractsSearch[],
        employers: EmployeesSearch[],
        leads: LeadsSearch[],
        training_group: GroupsSearch[]
    };
}

export interface Sales {
    amount: string,
    branch_id: number,
    debt: number,
    branch_name: string,
    contract_id: number,
    contract_resp_emp_name: string,
    discount: string,
    discount_base: string,
    dr_school_id: number,
    dr_school_sname: string,
    lead_id: number,
    notes: string,
    paid_for: string,
    product_price: string,
    product_id: number,
    product_name: string,
    sale_confirmed: string,
    sale_date: string,
    sale_emp_id: number,
    sale_emp_name: string,
    sale_id: number,
    sale_sum: string,
    status: string,
    student_name_from_leads: string,
    to_be_paid: string,
    tr_group_id: number,
    training_direction: string,
}

export interface SalesPostType {
    id: number,
    post: {
        // amount: string,
        // branch_id: number,
        // branch_name: string,
        // contract_id: number,
        // contract_resp_emp_name: string,
        // discount: string,
        // discount_base: string,
        // dr_school_id: number,
        // dr_school_sname: string,
        // lead_id: number,
        // notes: string,
        // paid_for: string,
        // product_price: string,
        // product_id: number,
        // product_name: string,
        // sale_confirmed: string,
        // sale_date: string,
        // sale_emp_id: number,
        // sale_emp_name: string,
        // sale_id: number,
        // sale_sum: string,
        // status: string,
        // student_name_from_leads: string,
        // to_be_paid: string,
        // tr_group_id: number,
        // training_direction: string,
        sale_date: string,
        sale_sum: string,
        amount: string,
        to_be_paid: string,
        paid_for: string,
        fk_lead_id: number,
        fk_contract_id: number,
        fk_emp_id: number,
        fk_dr_school_id: number,
        fk_product_id: number,
        notes: string,
    }
}

export interface GetSalesResponse {
    data: Sales[];
}

export interface Answer {
    is_correct: boolean
    answer_text: string
    id?: number
}

export interface Ticket {
    ticket_number: string | null
    image: string
    question: string
    topic: string[]
    answers: Answer[]
    id: string,
    answer_tip: any
}

export interface Practice {
    amount: string,
    branch_color: string,
    branch_id: number,
    branch_name: string,
    type_study_hour_name: string,
    type_study_hour_color: string,
    plan_start_date: string,
    fact_driving_time: string,
    plan_driving_hours: string,
    class_dr_create_date: string,
    class_dr_id: number,
    dr_school_id: number,
    dr_school_sname: string,
    emp_id: number,
    emp_name: string,
    end_date: string,
    lead_id: number,
    product_id: number,
    product_name: string,
    start_date: string,
    status: string,
    student_name_from_leads: string,
    tr_group_id: number,
    tr_group_number: number,
}

export interface PracticePostType {
    id: number,
    post: {
        dr_class_create_date: string,
        plan_start_date: string,
        fact_start_date: string,
        plan_end_date: string,
        fact_end_date: string,
        student_feedback: string,
        note_for_student: string,
        note_for_adm: string,
        fk_emp_id: number,
        fk_plan_master_id: number,
        fk_fact_master_id: number,
        fk_branch_id: number,
        fk_dr_school_id: number,
        fk_dr_session_id: number,
        fk_contract_id: number,
    }
}

export interface PracticePutType {
    id: number
    post: {
        dr_class_create_date: string
        plan_start_date: string
        plan_end_date: string
        fact_start_date: string
        fact_end_date: string
        note_for_student: string
        note_for_adm: string
        fk_emp_id: number
        fk_plan_master_id: number
        fk_fact_master_id: number
        fk_branch_id: number
        fk_dr_school_id: number
        fk_dr_session_id: number
        fk_contract_id: number
        status: string
        student_feedback: string
    }
}

export interface GetPracticeResponse {
    data: Practice[];
}

export interface GetPracticeByIdResponse {
    data: FullSlot;
}

export interface GetEmptyPracticeByIdResponse {
    data: EmptySlot;
}