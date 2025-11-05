# Create an improved user journey flowchart using Plotly
import plotly.graph_objects as go
import plotly.io as pio

# Define node positions with better spacing
nodes = {
    'A': {'text': 'User lands on<br>Homepage', 'x': 0.5, 'y': 0.95, 'color': '#1565C0', 'shape': 'circle'},
    'B': {'text': 'Views Hero Section<br>& Value Prop', 'x': 0.5, 'y': 0.82, 'color': '#2E7D32', 'shape': 'rect'},
    'C': {'text': 'Interested in<br>learning more?', 'x': 0.5, 'y': 0.67, 'color': '#F57C00', 'shape': 'diamond'},
    'D': {'text': 'End - Can return<br>later', 'x': 0.15, 'y': 0.52, 'color': '#424242', 'shape': 'circle'},
    'E': {'text': 'Explores Course<br>Options', 'x': 0.5, 'y': 0.52, 'color': '#1565C0', 'shape': 'rect'},
    'F': {'text': 'Ready to<br>enroll?', 'x': 0.5, 'y': 0.37, 'color': '#F57C00', 'shape': 'diamond'},
    'G': {'text': 'About Page or<br>Resources', 'x': 0.85, 'y': 0.22, 'color': '#2E7D32', 'shape': 'rect'},
    'H': {'text': 'Reviews Pricing<br>Page', 'x': 0.5, 'y': 0.22, 'color': '#1565C0', 'shape': 'rect'},
    'I': {'text': 'Selects pricing<br>option', 'x': 0.5, 'y': 0.07, 'color': '#1565C0', 'shape': 'rect'},
    'J': {'text': 'Completes<br>Enrollment', 'x': 0.5, 'y': -0.08, 'color': '#1565C0', 'shape': 'rect'},
    'K': {'text': 'End: Access to<br>Course Materials', 'x': 0.5, 'y': -0.23, 'color': '#424242', 'shape': 'circle'}
}

# Define connections with better routing
edges = [
    ('A', 'B'), ('B', 'C'), ('C', 'D'), ('C', 'E'), ('E', 'F'),
    ('F', 'G'), ('G', 'F'), ('F', 'H'), ('H', 'I'), ('I', 'J'), ('J', 'K')
]

# Create figure
fig = go.Figure()

# Add curved edges for better visibility
def add_curved_edge(start_node, end_node, curve_offset=0):
    start_x, start_y = start_node['x'], start_node['y']
    end_x, end_y = end_node['x'], end_node['y']
    
    # Calculate midpoint with optional curve
    mid_x = (start_x + end_x) / 2 + curve_offset
    mid_y = (start_y + end_y) / 2
    
    # Create curved path
    x_path = [start_x, mid_x, end_x]
    y_path = [start_y, mid_y, end_y]
    
    fig.add_trace(go.Scatter(
        x=x_path,
        y=y_path,
        mode='lines',
        line=dict(color='#333333', width=2, shape='spline'),
        showlegend=False,
        hoverinfo='skip'
    ))
    
    # Add arrowhead closer to the end node
    arrow_x = end_x - (end_x - mid_x) * 0.15
    arrow_y = end_y - (end_y - mid_y) * 0.15
    
    fig.add_annotation(
        x=arrow_x, y=arrow_y,
        ax=mid_x, ay=mid_y,
        xref='x', yref='y',
        axref='x', ayref='y',
        arrowhead=2,
        arrowsize=1.5,
        arrowwidth=2,
        arrowcolor='#333333',
        showarrow=True,
        text='',
    )

# Add edges with appropriate curves
for start, end in edges:
    start_node = nodes[start]
    end_node = nodes[end]
    
    # Add curve for the feedback loop
    if start == 'G' and end == 'F':
        add_curved_edge(start_node, end_node, curve_offset=0.1)
    else:
        add_curved_edge(start_node, end_node)

# Add decision labels with better positioning
fig.add_annotation(x=0.32, y=0.60, text="No", showarrow=False, font=dict(size=12, color='#333333', family="Arial Black"))
fig.add_annotation(x=0.52, y=0.60, text="Yes", showarrow=False, font=dict(size=12, color='#333333', family="Arial Black"))
fig.add_annotation(x=0.68, y=0.30, text="No", showarrow=False, font=dict(size=12, color='#333333', family="Arial Black"))
fig.add_annotation(x=0.50, y=0.30, text="Yes", showarrow=False, font=dict(size=12, color='#333333', family="Arial Black"))

# Add nodes with improved sizing
for node_id, node in nodes.items():
    if node['shape'] == 'diamond':
        # Larger diamond shape for decisions
        fig.add_trace(go.Scatter(
            x=[node['x']],
            y=[node['y']],
            mode='markers+text',
            marker=dict(
                symbol='diamond',
                size=80,
                color=node['color'],
                line=dict(width=2, color='white')
            ),
            text=node['text'],
            textposition='middle center',
            textfont=dict(size=11, color='white', family="Arial"),
            showlegend=False,
            hoverinfo='skip'
        ))
    elif node['shape'] == 'circle':
        # Circle shape for start/end points
        fig.add_trace(go.Scatter(
            x=[node['x']],
            y=[node['y']],
            mode='markers+text',
            marker=dict(
                symbol='circle',
                size=80,
                color=node['color'],
                line=dict(width=3, color='white')
            ),
            text=node['text'],
            textposition='middle center',
            textfont=dict(size=11, color='white', family="Arial"),
            showlegend=False,
            hoverinfo='skip'
        ))
    else:
        # Rectangle shape for process nodes
        fig.add_trace(go.Scatter(
            x=[node['x']],
            y=[node['y']],
            mode='markers+text',
            marker=dict(
                symbol='square',
                size=80,
                color=node['color'],
                line=dict(width=2, color='white')
            ),
            text=node['text'],
            textposition='middle center',
            textfont=dict(size=11, color='white', family="Arial"),
            showlegend=False,
            hoverinfo='skip'
        ))

# Update layout with better spacing
fig.update_layout(
    title="Retiree Course Website User Journey",
    xaxis=dict(
        showgrid=False,
        zeroline=False,
        showticklabels=False,
        range=[-0.05, 1.05]
    ),
    yaxis=dict(
        showgrid=False,
        zeroline=False,
        showticklabels=False,
        range=[-0.35, 1.05]
    ),
    plot_bgcolor='white',
    paper_bgcolor='white',
    font=dict(family="Arial", size=12)
)

# Save the chart as PNG and SVG
fig.write_image("user_journey_flowchart.png")
fig.write_image("user_journey_flowchart.svg", format="svg")

print("Improved flowchart created successfully as user_journey_flowchart.png and user_journey_flowchart.svg")