<?php
/**
 * Portfolio CMS — must-use plugin bootstrap.
 * Loads ACF JSON from wp-content/acf-json (no theme edits required).
 */

if (!defined('ABSPATH')) {
    exit;
}

add_filter('acf/settings/save_json', function () {
    return WP_CONTENT_DIR . '/acf-json';
});

add_filter('acf/settings/load_json', function ($paths) {
    $paths[] = WP_CONTENT_DIR . '/acf-json';
    return $paths;
});

add_filter('graphql_response_headers_to_send', function ($headers) {
    $headers['Access-Control-Allow-Origin']  = '*';
    $headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    $headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    return $headers;
});

/**
 * GraphQL compatibility for this repo.
 *
 * The frontend queries `PostInfo { ... }` (note the capital letters),
 * but WPGraphQL for this setup does not expose a schema-stable field with
 * that exact casing. Instead, we rewrite the incoming request to use a
 * dedicated compat field we register below: `postInfoCompat`.
 */
add_filter('graphql_request_data', function ($data, $request_context) {
    if (!is_array($data)) {
        return $data;
    }

    if (isset($data['query']) && is_string($data['query'])) {
        $data['query'] = str_replace('PostInfo', 'postInfoCompat', $data['query']);
    }

    return $data;
}, 10, 2);

/**
 * Register a schema-stable compat object (`PostInfoCompat`) for the
 * frontend queries. We read values directly from post meta keys so the
 * frontend does not depend on WPGraphQL's ACF bridge resolver behavior.
 */
add_action('graphql_register_types', function () {
    if (!function_exists('register_graphql_object_type') || !function_exists('register_graphql_field')) {
        return;
    }

    register_graphql_object_type('PostInfoCompat', [
        'description' => 'Backwards compatible PostInfo object for the frontend.',
        'fields' => [
            'subtitle' => [
                'type' => 'String',
                'resolve' => function ($source) {
                    $id = is_array($source) ? ($source['databaseId'] ?? null) : ($source->databaseId ?? null);
                    return $id ? get_post_meta((int) $id, 'subtitle', true) : null;
                },
            ],
            'branding' => [
                'type' => 'String',
                'resolve' => function ($source) {
                    $id = is_array($source) ? ($source['databaseId'] ?? null) : ($source->databaseId ?? null);
                    return $id ? get_post_meta((int) $id, 'branding', true) : null;
                },
            ],
            'projectintrotext' => [
                'type' => 'String',
                'resolve' => function ($source) {
                    $id = is_array($source) ? ($source['databaseId'] ?? null) : ($source->databaseId ?? null);
                    return $id ? get_post_meta((int) $id, 'projectintrotext', true) : null;
                },
            ],
            'projectdescription' => [
                'type' => 'String',
                'resolve' => function ($source) {
                    $id = is_array($source) ? ($source['databaseId'] ?? null) : ($source->databaseId ?? null);
                    return $id ? get_post_meta((int) $id, 'projectdescription', true) : null;
                },
            ],
            'clientheading' => [
                'type' => 'String',
                'resolve' => function ($source) {
                    $id = is_array($source) ? ($source['databaseId'] ?? null) : ($source->databaseId ?? null);
                    return $id ? get_post_meta((int) $id, 'clientheading', true) : null;
                },
            ],
            'date' => [
                'type' => 'String',
                'resolve' => function ($source) {
                    $id = is_array($source) ? ($source['databaseId'] ?? null) : ($source->databaseId ?? null);
                    return $id ? get_post_meta((int) $id, 'date', true) : null;
                },
            ],
            'client' => [
                'type' => 'String',
                'resolve' => function ($source) {
                    $id = is_array($source) ? ($source['databaseId'] ?? null) : ($source->databaseId ?? null);
                    return $id ? get_post_meta((int) $id, 'client', true) : null;
                },
            ],
        ],
    ]);

    register_graphql_field('Post', 'postInfoCompat', [
        'type' => 'PostInfoCompat',
        'description' => 'Compat field used by the frontend queries.',
        'resolve' => function ($post_model) {
            $id = $post_model->databaseId ?? null;
            return [
                'databaseId' => $id,
            ];
        },
    ]);
});
