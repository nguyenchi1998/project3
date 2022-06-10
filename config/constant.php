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
    'position' => [
        'employee' => 1,
        'marketing' => 2,
        'manager' => 3,
        'director' => 4,
    ],
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
