<?php

return [
    'project_priority' => [
        'low' => 1,
        'normal' => 2,
        'high' => 3,
    ],
    'project_type' => [
        'business' => 1,
        'strategy' => 2,
    ],
    'project_member_role' => [
        'viewer' => 1,
        'developer' => 2,
        'qa' => 3,
        'brse' => 4,
        'pm' => 5,
    ],
    'role' => [
        'super_admin' => 1,
        'director' => 2,
        'division_manager' => 3,
        'group_manager' => 4,
        'employee' => 5,
    ],
    'permission' => [
        'project_list' => 1,
        'project_store' => 2,
        'project_update' => 3,
        'project_delete' => 4,

        'employee_list' => 5,
        'employee_store' => 6,
        'employee_update' => 7,
        'employee_delete' => 8,
    ],
    'create_project_role' => [1, 2, 3, 4],
    'create_project_permission' => [2],
    'position' => [
        'accountant' => 1,
        'designer' => 2,
        'hr' => 3,
        'dev' => 4,
        'brse' => 5,
        'part_time' => 6,
        'qa_manual' => 7,
        'qa_auto' => 8,
        'comtor' => 9,
        'pqa' => 10,
        'bo' => 11,
        'it_guy' => 12,
        'ci' => 13,
        'marketing' => 14,
    ],
    'manager_position' => [1, 2, 3],
    'project_status' => [
        'new' => 1,
        'progress' => 2,
        'done' => 3,
        'pending' => 4,
    ],
    'assign_type' => [
        'support' => 1,
        'main' => 2,
    ],
    'assign_status' => [
        'active' => 1,
        'reject' => 2,
    ],
    'language_level' => [
        'beginner' => 1,
        'intermediate' => 2,
        'proficient' => 3
    ],
    'issue_status' => [
        //open
        'new' => 1,
        'assigned' => 2,
        'to_be_confirm' => 3,
        'suspended' => 4,
        'done' => 5,
        'feedback' => 6,
        //closed
        'confirmed' => 7,
        'closed' => 8,
        'reject' => 9,
    ],
    'issue_priority' => [
        'low' => 1,
        'normal' => 2,
        'high' => 3,
        'immediate' => 4
    ],
    'relative_issue_action' => [
        'unlink' => 1,
        'link' => 2,
    ],
    'target_version_status' => [
        'closed' => 1,
        'lock' => 2,
        'open' => 3,
    ],
];
