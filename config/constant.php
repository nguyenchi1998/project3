<?php

return [
    'project_priority' => [
        'low' => 0,
        'normal' => 1,
        'high' => 2,
    ],
    'project_type' => [
        'strategy' => 1,
        'business' => 0,
    ],
    'project_member_role' => [
        'viewer' => 0,
        'developer' => 1,
        'qa' => 2,
        'brse' => 3,
        'pm' => 4,
    ],
    'position' => [
        'employee' => 0,
        'manager' => 1,
        'director' => 2,
    ],
    'project_status' => [
        'new' => 0,
        'progress' => 1,
        'done' => 2,
        'pending' => 3,
    ],
    'assign_type' => [
        'support' => 0,
        'main' => 1,
    ],
    'assign_status' => [
        'active' => 0,
        'reject' => 1,
    ],
    'language_level' => [
        'beginner' => 0,
        'intermediate' => 1,
        'proficient' => 2
    ],
    'issue_status' => [
        //open
        'new' => 0,
        'assigned' => 1,
        'to_be_confirm' => 2,
        'suspended' => 3,
        'done' => 4,
        'feedback' => 5,
        //closed
        'confirmed' => 6,
        'closed' => 7,
        'reject' => 8,
    ],
    'issue_priority' => [
        'low' => 0,
        'normal' => 1,
        'high' => 2,
        'immediate' => 3
    ],
    'relative_issue_action' => [
        'link' => 1,
        'unlink' => 0
    ],
    'target_version_status' => [
        'closed' => 0,
        'lock' => 1,
        'open' => 2,
    ],
];
